/*
Inbound script used to transform the payload coming in from TeamCity.
*/

var teamcityLibrary = require('teamcityUtility');


var payload = JSON.parse(request.body);  //Use this if the payload is a JSON object in the request body

    var channelName = payload.build.buildFullName.replace(/::/g, ' ').replace(/ /g,'-').substring(0,18).toLowerCase() + "_" + payload.build.buildNumber;
    var slackresponse = slackLibrary.createChannel(channelName);
    console.log("Slack Response: " + JSON.stringify(slackresponse));
    slackLibrary.postMessage("?token=" + http.authenticate( 'Slack' ) + "&channel=" + slackresponse.name + "&text=" + encodeURIComponent(payload.build.projectName + " - " + payload.build.buildNumber + " - " + " failed"));

var changeinfo = teamcityLibrary.teamcityGet(payload.build.buildId);

console.log("Change Info: " + JSON.stringify(changeinfo))
trigger.recipients = recipients;
    trigger.properties = payload.build;
    trigger.properties.Message = "A build failure has occured.";



    trigger.properties.channel = slackresponse.name;
    trigger.properties.buildInfo = JSON.stringify(payload.build);
    trigger.properties.changeInfo = JSON.stringify(payload.build.changes);



if (changeinfo.count == 0){
    console.log("Notifying the Build Manager");
    var recipients = [];
    recipients.push({'targetName': 'kapgar'});
    form.post(trigger);
    slackLibrary.postMessage("?token=" + http.authenticate( 'Slack' ) + "&channel=" + slackresponse.name + "&text=" + encodeURIComponent("Build Manger: kapgar has been notified.  No committers have been notified."));
}


for (i = 0; i < changeinfo.count; i++) {
    console.log("Notifying the Users With Commits");

    var user = changeinfo.change[i].username;
    console.log("User: " + user);
    var changeurllocal = changeinfo.change[i].webUrl;
    var changeurldeep = changeurllocal.replace('win2k8r2ent', '199.204.219.203');
    console.log("Change URL: " + changeurldeep);

    var recipients = [];
    recipients.push({'targetName': user});

    trigger.properties.Message = "Your commits have been associated with a failed build."
    trigger.recipients = recipients;
    trigger.properties.change = JSON.stringify(payload.build.changes);
    form.post(trigger);
}













