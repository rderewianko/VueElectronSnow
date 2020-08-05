---
---<h1 id="welcome-automatic-itam-creator-aic">Welcome Automatic Itam Creator AIC</h1>
<p>This desktop application reads system the hardware information from your computer and creates an CI (<a href="https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/configuration-management/reference/cmdb-table-property-descriptions.html">Configuration Item</a>) in your Service Now Instance, by using it’s <a href="https://docs.servicenow.com/bundle/orlando-application-development/page/build/applications/concept/api-rest.html">REST API</a><br>
The Following Web Technologies are used in the development of this application</p>
<ul>
<li>HTML5</li>
<li>CSS (<a href="https://getbootstrap.com/">Bootstap</a>)</li>
<li>Javascript ES6</li>
</ul>
<h1 id="project-dependencies">Project Dependencies</h1>
<p>This Desktop Application is built using <a href="https://www.electronjs.org/">Electron</a> &amp; <a href="https://vuejs.org/">Vue JS</a><br>
Uses the <a href="https://github.com/SimulatedGREG/electron-vue">Electron-vue</a> template<br>
It’s Available for Windows, Linux and Mac (OSX). Currently Only Tested on Windows.</p>
<p><strong>Extra Important dependencies</strong><br>
<a href="https://www.npmjs.com/package/systeminformation">System Information Module</a>  - For Obtaining Hardware, OS and Network Card Information for all Operating Systems.</p>
<p><a href="https://github.com/axios/axios">Axios JS</a> - HTTP Client for making calls to the API.</p>
<p><a href="https://www.npmjs.com/package/vue-notification">Vue Notifications</a>  - For Notifications withing the App.</p>
<h2 id="how-the-techonologies-work">How the techonologies work</h2>
<p>Electron runs what can easily be explained as a Web Browser (chromium) to be exact.<br>
With in Electron we run our web application, that is simply a form with all the fields required to create an ci record.<br>
Electron uses <a href="https://nodejs.org/en/">NodeJS</a>  (A Javascript runtime - Google Chrome’s V8 Engine) to communicate with the operating system.</p>
<h2 id="how-the-application-works">How the application works</h2>
<p>There are currently 9 fields on this form</p>
<ul>
<li><strong>Name:</strong> : Reads the Hostname of the machine , and if it’s windows it’ll remove the first two letters of the hostname. For example PC123456 will be 123456. For Mac the first 3.</li>
<li><strong>Serial Number:</strong> Serial Number</li>
<li><strong>Model:</strong> It looks up the Model on the table of computer’s model.</li>
<li><strong>Manufacturer:</strong> it looks it up on the Manafucturer’s table</li>
<li><strong>OS Version:</strong>  Get’s the Version of The OS</li>
<li><strong>OS</strong>: Get’s the OS</li>
<li><strong>PCI Network</strong>: Is a toggle for the network</li>
<li><strong>Mac Addres</strong>: Let’s you choose from the list of adapters on your computer.</li>
<li><strong>Encryption</strong> : This Selects the corresponding<br>
-<em>To read the Encryption status requires Administrator Access</em></li>
</ul>
