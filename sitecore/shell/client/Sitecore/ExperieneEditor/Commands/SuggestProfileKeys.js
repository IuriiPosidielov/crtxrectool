define(["sitecore", "/-/speak/v1/ExperienceEditor/ExperienceEditor.js", "/-/speak/v1/ExperienceEditor/ExperienceEditor.Context.js"], function (Sitecore, ExperienceEditor, EContext) {
    Sitecore.Commands.SuggestProfileKeys =
    {
        canExecute: function(context) {
            return true;
        },
        execute: function (context) {
	  console.log(context);
          var rectoolDialogTitle = "Recommendation Tool";//context.app.canExecute("ExperienceEditor.Workbox.GetDialogTitle", context.currentContext);
          var dialogPath = "/sitecore/shell/client/Applications/SuggestProfileKeys/?fo=" + context.currentContext.itemId + "&la=" + context.currentContext.language + "&vs=" + context.currentContext.version + "&pa=2&mo=media";
          var dialogFeatures = "dialogHeight:600px;dialogWidth:1200px;header:" + rectoolDialogTitle + ";";
          ExperienceEditor.Dialogs.showModalDialog(dialogPath, '', dialogFeatures);
        }
    };
});