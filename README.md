# TeamCity
TeamCity is a Java-based build management and continuous integration server from JetBrains. 

# Pre-Requisites
* TeamCity Instance with the webhook plugin installed.
* xMatters account - If you don't have one, [get one](https://www.xmatters.com)!

# Files
* [JenkinsLibrary.js](JenkinsLibrary.js) - The javascript file to be pasted into a Shared Library. Jenkins is limited to pushing 3 or 4 environmental variables via the http_request plugin.  This library reaches back into Jenkins via a GET command to extract additional information about the build. 
* [Jenkins.zip](Jenkins.zip) - The Communication Plan (optional).  You can use this pre built communication plan and import it into your xMatters instance or create one from scratch. 
* [JenkinsIB.js](JenkinsIB.js) - The javascript file to be pasted into the Inbound IB component.  This script calls the library.

# Installation

## TeamCity set up
Install the TeamCity webhook plugin [TeamCity Webhooks](https://plugins.jetbrains.com/plugin/8948-webhooks).  In TeamCity select a project and click on the Webhook Tab.  In the Webhook tab add a new webhook.
<kbd>
<img src="media/Projectwebhooks.png">
</kbd>


Enter the information needed to point to xMatters in the build steps.
<kbd>
<img src="media/webhook1.png">
</kbd>
<kbd>
<img src="media/webhook2.png">
</kbd>
<kbd>
<img src="media/webhook3.png">
</kbd>
<kbd>
<img src="media/webhook4.png">
</kbd>

See the below list for the required information:

| Input | Value |
| ----- | ------|
| URL   | This in an xMatters Inbound Integration URL.  You will create this on step 3 in the xMatters set up section.  For additonal information see instructions on how to create. [Inbound Integration](https://help.xmatters.com/OnDemand/xmodwelcome/integrationbuilder/build-integrations.htm) |
| Enabled | checked |
| Payload Format | Legacy Webhook (JSON) |
| Trigger on Events | none checked |
| On Completion | see screen shot |
| All Project Builds | checked |
| All Sub-Project Builds | checked |
| Build | checked |
|Authentication Type | No Authentication |
| Payload Content | Nothing needs to be changed we use the default settings |

The following is an example of what is sent when a build fails:

```
{
"build":{
"buildStatus":"Failure",
"buildResult":"failure",
"buildResultPrevious":"failure",
"buildResultDelta":"unchanged",
"notifyType":"buildFinished",
"buildFullName":"Hello World TC Demo :: Build",
"buildName":"Build",
"buildId":"51",
"buildTypeId":"HelloWorldTcDemo_Build",
"buildInternalTypeId":"bt4",
"buildExternalTypeId":"HelloWorldTcDemo_Build",
"buildStatusUrl":"http://win2k8r2ent/viewLog.html?buildTypeId=HelloWorldTcDemo_Build&buildId=51",
"buildStatusHtml":"<span class=\"tcWebHooksMessage\"><a href=\"http://win2k8r2ent/project.html?projectId=HelloWorldTcDemo\">Hello World TC Demo</a> :: <a href=\"http://win2k8r2ent/viewType.html?buildTypeId=HelloWorldTcDemo_Build\">Build</a> # <a href=\"http://win2k8r2ent/viewLog.html?buildTypeId=HelloWorldTcDemo_Build&buildId=51\"><strong>33</strong></a> has <strong>finished</strong> with a status of <a href=\"http://win2k8r2ent/viewLog.html?buildTypeId=HelloWorldTcDemo_Build&buildId=51\"> <strong>failure</strong></a> and was triggered by <strong>Git</strong></span>",
"buildStartTime":"",
"currentTime":"",
"rootUrl":"http://win2k8r2ent",
"projectName":"Hello World TC Demo",
"projectId":"HelloWorldTcDemo",
"projectInternalId":"project4",
"projectExternalId":"HelloWorldTcDemo",
"buildNumber":"33",
"agentName":"win2k8r2ent",
"agentOs":"Windows Server 2008 R2, version 6.1",
"agentHostname":"127.0.0.1",
"triggeredBy":"Git",
"message":"Build Hello World TC Demo :: Build has finished. This is build number 33, has a status of \"failure\" and was triggered by Git",
"text":"Hello World TC Demo :: Build has finished. Status: failure",
"buildStateDescription":"finished",
"buildRunners":[
"Container Deployer"
],
"buildTags":[
],
"extraParameters":[
{
"name":"preferredDateFormat",
"value":""
}
],
"teamcityProperties":[],
"changes":[
{
"version":"a9026bb7810183ad0b42855b40c7f8d439b9cd52",
"change":{
"files":[
"server.js"
],
"comment":"Update server.js",
"vcsRoot":"https://github.com/kapgarxmatters/Hello-World-TC-Demo#refs/heads/master"
}
},
{
"version":"fe04dbe00f1ed84b9f5b385fab3ef8ee51fa8982",
"change":{
"files":[
"README.md"
],
"comment":"Update README.md",
"vcsRoot":"https://github.com/kapgarxmatters/Hello-World-TC-Demo#refs/heads/master"
}
}
]
}
}
```


## xMatters set up
1. Import the Communication Plan (see files).  If this step is done you can skip steps 2 and 3.
2. Create a new Shared Library and add the code from the JenkinsLibrary.js file.  
3. Create (In|Out)bound integration and add the code from the JenkinsIB.js file.
4. Configure the xMatters Endpoints. [xMatters Endpoints](https://help.xmatters.com/OnDemand/xmodwelcome/integrationbuilder/configure-endpoints.htm)
5. Create a DevOps group in xMatters and add your self to the group. [xMatters Groups](https://help.xmatters.com/OnDemand/groups/groups.htm).  The name of the DevOps group can be changed in the Inbound IB script.
  
   
# Testing
Run a Build in Jenkins.  You should see in the console, Jenkins executing the HTTP_Request Build step and a status of 202.
<kbd>
<img src="media/JenkinsConsole.png">
</kbd>

A message should come through on your devices.  Which ever devices you have configured in xMatters.
<kbd>
<img src="media/DeviceMessage.png">
</kbd>

# Troubleshooting
View xMatters Activity Stream to determine issues with Jenkins connectivity.
