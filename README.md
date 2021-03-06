# Transcribe
Transcription of minority audio for review by Paratext

This project uses a react redux ui which is displayed in a GeckoFx browser control (on Windows).

To do development work on the ReactUi, launch the react folder using VsCode. Then open a command window and type:

`npm install`

to install the dependencies. If you add the api folder to public and include the api files from the data folder and then include the images folder with its contents in the api folder, then using

`npm start`

will allow you to adjust the code and view the results in the browser. When ready to test back end (C# code), use 

`npm run build`

to prepare the web distribution files. (You will want to have the api file removed from the build folder.)

The UpdateEmbeddedResourceNames project will edit the ReactUi.csproj file. It will remove the react Embedded Resources and add the contents of the react\build folder. This is necessary because `npm run build` adds a hash to the file names so the names change with every change that is made to the react user interface.

After updating ReactUi.csproj, rebuilding the Transcribe.Windows project will rebuild the rest of the project. With this set as the Start Up project, the developer can set break points and use start to do debugging in the C# code.

When Transcribe.Windows is executed, it launches the SimpleServer code. It tries to use the localhost port 3010 to server the files from the react\build folder. Then the GeckoFx Browser control navigates to this port address to load the interface.

The browser control is monitoring the HTTP requests. When it observes a request that begins with /api/ it interprets it as an API request for the C# to respond to. The application data is in the default location in ProgramData, company name, and application name.

## These are GET requests:
- `GetUsers` - loads the list of all users
- `GetTasks` - loads the list of all tasks
- `GetTasks?user=<username>` - loads that list of tasks that are available to the `<username>`

## This is a PUT request:
- `TaskEvent?action=<action>&task=<task>&user=<user>` - records an action (see XML schema) on the task
- `UpdateUser?user=<user>&project=<project>&<tag>=<value>` - updates value in user data

### List of tags for UpdateUser api
- avatarUri
- name
- uilang
- font
- fontsize
- playpause
- back
- forward
- slower
- faster

