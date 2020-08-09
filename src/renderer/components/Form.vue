<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <form @submit.prevent="getIdsFromTables" class="col-12 jumbotron">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="pcName">Name</label>
            <input
              v-model="form.pcName"
              type="test"
              class="form-control"
              id="pcName"
              aria-describedby="pcNameHelp"
              required
            />
            <small id="pcNameHelp" class="form-text text-muted">
              This is the hostname of this machine, - 2 on win, -3 on
              mac
            </small>
          </div>
          <div class="form-group col-md-6">
            <label for="pcSerialNumber">Serial Number</label>
            <input
              type="text"
              class="form-control"
              id="pcSerialNumber"
              aria-describedby="pcAssetTagHelp"
              v-model="form.pcSerialNumber"
              required
            />
            <small
              id="pcSerialNumberHelp"
              class="form-text text-muted"
            >This is the Serial Number of this machine</small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="pcModel">Model</label>
            <input
              type="text"
              class="form-control"
              id="pcModel"
              aria-describedby="pcModelHelp"
              v-model="form.pcModel"
              required
            />
            <small id="pcModelelp" class="form-text text-muted">This is the Model of this machine</small>
          </div>
          <div class="form-group col-md-6">
            <label for="PcManufacturer">Manufacturer</label>
            <input
              type="text"
              class="form-control"
              id="PcManufacturer"
              aria-describedby="PcManufacturerHelp"
              v-model="form.PcManufacturer"
              required
            />
            <small id="PcManufacturerHelp" class="form-text text-muted">This is the manufacturer</small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="pcOSversion">Os Version</label>
            <input
              type="text"
              class="form-control"
              id="pcOSversion"
              aria-describedby="pcOperatingSystemHelp"
              v-model="form.pcOSversion"
              required
            />
            <small id="pcOSversionHelp" class="form-text text-muted">This is the Version of your os</small>
          </div>
          <div class="form-group col-md-6">
            <label for="pcOS">Operating System</label>
            <input
              type="test"
              class="form-control"
              id="pcOS"
              aria-describedby="pcOperatingSystemHelp"
              v-model="form.pcOS"
              required
            />
            <small id="pcOSHelp" class="form-text text-muted">This is your Operating System</small>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="ConnectsToPci"
                v-model="form.ConnectsToPci"
                value="connects_to_pci"
              />
              <label class="custom-control-label" for="ConnectsToPci">PCI Network</label>
            </div>

            <small
              id="ConnectsToPciHelp"
              class="form-text text-muted"
            >Payment Card Industry Data Security Standard</small>
          </div>
        </div>
        <div class="form-row">
          <!-- Encription -->
          <div class="form-group col-md-6">
            <label for="PcEncryption">Encryption</label>
            <input
              type="text"
              class="form-control"
              id="PcEncryption"
              aria-describedby="PcEncryptionHelp"
              v-model="form.PcEncryption"
              required
            />
            <small
              id="PcEncryptionHelp"
              class="form-text text-muted"
            >This is what it's Encrypted with</small>
          </div>
          <!-- Mac Adress Select Field -->
          <div class="form-group col-md-6">
            <label for="PcMacAddress">Mac Address</label>
            <select class="custom-select" v-model="form.mac">
              <option
                v-for="item in cards"
                :key="item.ifaceName"
                :value="item"
              >{{ item.iface }} | {{ item.mac }} | {{ item.ip4 }}</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          v-bind:disabled="emptyFields"
        >Create Itam Record</button>
      </form>
      <notifications group="foo" />
      <div v-if="showNotification">
        <!-- <Notification :not-on-db="NotFoundOnDb" /> -->
      </div>
    </div>
  </div>
</template>

<script>
const si = require('systeminformation')
const axios = require('axios')
const shell = require('shelljs')
const electron = require('electron')
const { ipcRenderer } = require('electron')

// SNOW CREDS
const BASE_URL = 'https://dev81248.service-now.com/api/now/table/'
const SNOW_USER = 'Stevec'
const SNOW_PASS = 'Console.L0g'

// Axios Configuration
const instance = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: SNOW_USER,
    password: SNOW_PASS
  }
})
// import Notification from "@/components/Notification";

export default {
  name: 'Form',
  data () {
    return {
      form: {
        pcName: '',
        PcEncryption: '',
        pcSerialNumber: '',
        pcModel: '',
        PcManufacturer: '',
        pcOSversion: '',
        pcOS: '',
        ConnectsToPci: false,
        mac: {}
      },
      cards: [],
      showNotification: false,
      NotFoundOnDb: []
    }
  },

  created () {
    this.getSystemInformation()
  },
  components: { Notification },
  computed: {
    emptyFields () {
      if (
        this.form.pcName == '' ||
        this.form.pcSerialNumber == '' ||
        this.form.model_id == '' ||
        this.form.PcEncryption == '' ||
        this.form.mac == '' ||
        this.form.pcOS == '' ||
        this.form.pcOSversion == '' ||
        this.form.PcManufacturer == ''
      ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // Changes win32 to Windows  & darwin to OSX
    osNameChanger (res) {
      return res.platform == 'win32'
        ? 'Windows'
        : res.platform == 'darwin'
          ? 'OSX'
          : res.platform
    },
    // Removes the PC and MAC from the hostname
    pcNameChanger (res) {
      let mac = res.hostname.includes('MAC')
      let pc = res.hostname.includes('PC')
      return pc // If true
        ? res.hostname.substr(2) // take 2
        : mac // else if this is true
          ? res.hostname.substr(3) // take 3
          : res.hostname // else return hostname
    },
    // Runs various methods from the systeminformation module
    async getSystemInformation () {
      await si
        .system()
        .then((res) => {
          this.form.pcSerialNumber = res.serial
          this.form.pcModel = res.model
          this.form.PcManufacturer = res.manufacturer
        })
        .catch((err) => {
          alert(err)
          console.log(`Si System ${err}`)
        })
      await si
        .osInfo()
        .then((res) => {
          console.log(res)
          this.form.pcOSversion = `${res.distro} ${res.build}`
          this.form.pcOS = this.osNameChanger(res)
          this.form.pcName = this.pcNameChanger(res)
        })
        .catch((err) => {
          alert(err)
          console.log(`Si onIfo ${err}`)
        })
      await si
        .networkInterfaces()
        .then((res) => {
          this.cards = res
          this.form.mac = res[0]
        })
        .catch((err) => {
          console.log(err)
        })
      this.getEncryption()
    },
    // Posts Network Card after creating the Itam Record
    postNetworkAdapter (result) {
      let net = {
        name: this.form.mac.ifaceName,
        ip_address: this.form.mac.ip4,
        mac_address: this.form.mac.mac,
        cmdb_ci: result.sys_id
      }
      instance.post('cmdb_ci_network_adapter', net).then((res) => {
        this.$notify({
          group: 'foo',
          title: 'Sucessfully Added Network Card ',
          text: `Added Network Card named ${res.data.result.name} Sucessfully`,
          type: 'success',
          closeOnClick: true,
          duration: -2
        })
      })
    },
    // Update Existing Itam
    updateExistingItam (data, info) {
      instance
        .put(`cmdb_ci_computer/${data[0].sys_id}`, info)
        .then((res) => {
          let result = res.data.result
          this.$notify({
            group: 'foo',
            title: 'Sucessfully Created ITAM Record ',
            text: `Computer Name ${result.name}`,
            type: 'success',
            duration: -2
          })

          // Only after a successfull post , it'll make a second post with the network card
          this.checkIfNetworkCardExists(result)
        })
        .catch((err) => {
          alert(err)
        })
    },
    // WORK IN PROGRESS - TO CHECK IF NAME EXISTS BEFORE POST
    async checkIfItamExists (info) {
      await instance
        .get(
          `cmdb_ci_computer?sysparm_query=GOTOname%3D${encodeURIComponent(
            info.name
          )}&sysparm_limit=1`
        )
        .then((res) => {
          let data = res.data.result
          if (data.length == 0) {
            // Means tag name dose not exist on snow
            this.postToSnow(info)
          } else {
            // Prompt
            let c = confirm(
              `${info.name} Already exists, Would you like to update it ?`
            )
            // If prompt is yes
            if (c == true) {
              console.log('Clicked yes')
              this.updateExistingItam(data, info)
            } else {
              console.log('Clicked No')
              // this.$destroy();
            }
          }
        })
    },
    checkIfNetworkCardExists (result) {
      instance
        .get(
          `cmdb_ci_network_adapter?sysparm_query=cmdb_ci%3D${
            result.sys_id
          }%5Emac_address%3D${encodeURIComponent(
            this.form.mac.mac
          )}&sysparm_limit=1`
        )
        .then((res) => {
          if (res.data.result.length > 0) {
            alert(
              `This mac ${res.data.result[0].mac_address} Already Exsist. Not adding it again`
            )
          } else {
            this.postNetworkAdapter(result)
          }
        })
    },
    // Post the object with the correct fields to create the itam record
    postToSnow (info) {
      instance
        .post('cmdb_ci_computer', info)
        .then((res) => {
          console.log(res)
          let result = res.data.result
          this.$notify({
            group: 'foo',
            title: 'Sucessfully Created ITAM Record ',
            text: `Computer Name ${result.name}`,
            type: 'success',
            duration: -2
          })
          // Only after a successfull post , it'll make a second post with the network card
          this.checkIfNetworkCardExists(result)
        })
        .catch((err) => {
          alert(err)
        })
    },
    // This is what runs when the button is clicked, makes GET requests to different tables to get the ID
    async getIdsFromTables () {
      let info = {
        name: this.form.pcName,
        model_id: this.form.pcModel,
        serial_number: this.form.pcSerialNumber,
        os_version: this.form.pcOSversion,
        os: this.form.pcOS,
        manufacturer: this.form.PcManufacturer,
        u_connects_to_pci_device: this.form.ConnectsToPci,
        u_disk_encrypted_by: this.form.PcEncryption
      }
      info.manufacturer == 'HP'
        ? (info.manufacturer = 'Hewlett-Packard')
        : info
      // Gets Manufacturer ID
      await instance
        .get(
          `core_company?sysparm_query=nameLIKE${encodeURIComponent(
            info.manufacturer
          )}&sysparm_limit=1`
        )
        .then((res) => {
          if (res.data.result.length != 0) {
            info.manufacturer = res.data.result[0].sys_id
          } else {
            this.NotFoundOnDb.push('Manufacturer')
            this.$notify({
              group: 'foo',
              title: `PC Manufacturer ${info.manufacturer} Not Found on Database `,
              text: 'Please Create Manually',
              type: 'error',
              closeOnClick: true,
              duration: -2,
              ignoreDuplicates: true
            })
          }
        })
      // Gets MODEL ID,  nameLIKE , Name Contains
      await instance
        .get(
          `cmdb_model?sysparm_query=nameLIKE${encodeURIComponent(
            info.model_id
          )}&sysparm_limit=1`
        )
        .then((res) => {
          let id
          if (res.data.result.length != 0) {
            id = res.data.result[0].sys_id
            info.model_id = id
            // this.postToSnow(info);
            this.checkIfItamExists(info)
          } else {
            this.NotFoundOnDb.push('Model')
            this.$notify({
              group: 'foo',
              title: 'PC Model  Not Found on Database ',
              text: 'Please Create Manually',
              type: 'error',
              closeOnClick: true,
              duration: -2,
              ignoreDuplicates: true
            })
          }
        })
      if (this.NotFoundOnDb.length > 0) {
        this.showNotification = true
        let c = confirm(
          ` ${this.NotFoundOnDb.map((i) => i)} NOT FOUND. ADD ANYWAY?`
        )
        if (c == true) {
          console.log('yes')
          this.checkIfItamExists(info)
          this.NotFoundOnDb = []
        } else {
          // this.$destroy();
          console.log('No')
        }
      }
    },
    // Get's Bitlocker Version
    getBitLockerVersion () {
      let options = ['BitLocker', 'FileVault', 'Not Encrypted']
      let protectionStatus = ipcRenderer.sendSync('bitlockerProtectionStatus')
      protectionStatus.includes('Off')
        ? (this.form.PcEncryption = options[2])
        : protectionStatus.includes('On')
          ? (this.form.PcEncryption = options[0])
          : (this.form.PcEncryption = '')
    },
    // Get FileVault Version
    getFileVaultVersion () {
      let status = ipcRenderer.sendSync('fileVaultStatus')
      console.log(status)
      status.includes('On')
        ? (this.form.PcEncryption = 'FileVault')
        : (this.form.PcEncryption = 'Not Encrypted')
    },
    // Get's encryption depending on platform
    getEncryption () {
      // 'linux', 'darwin', 'win32'
      si.osInfo().then((res) => {
        if (res.platform === 'win32') {
          this.getBitLockerVersion()
        } else if (res.platform === 'darwin') {
          this.getFileVaultVersion()
          //  Need to add the get filevault
        } else if (res.platform == 'linux') {
          console.log('linux')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
