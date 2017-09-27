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

## Jenkins set up
Install the TeamCity webhook plugin [TeamCity Webhooks](https://plugins.jetbrains.com/plugin/8948-webhooks).  In TeamCity select a project and click on the Webhook Tab.  In the Webhook tab add a new webhook.
<kbd>
<img src="media/http_request.png">
</kbd>

Enter the information needed to point to xMatters in the build steps.
<kbd>
<img src="media/build_step_part1.png">
</kbd>
<kbd>
<img src="media/build_step_part2.png">
</kbd>

See the below list for the required information:

| Input | Value |
| ----- | ------|
| URL   | This in an xMatters Inbound Integration URL.  See instructions on how to create. [Inbound Integration](https://help.xmatters.com/OnDemand/xmodwelcome/integrationbuilder/build-integrations.htm) |
| HTTP mode | POST |
| Pass build params to URL| Yes |
| Request Body | JSON formated body of Jenkins Environmental values available to the http_plugin. [Jenkins Set Environment Variables](https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project) |


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
