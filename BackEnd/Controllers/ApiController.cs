using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using RecommendationTooldBackEnd.Foundation;
using Sitecore;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.SecurityModel;
using Sitecore.Web.Http.Filters;
/// <summary>
/// You can reach the Test() action on url: /sitecore/api/ssc/rectool/context/1/test
/// </summary>

namespace RecommendationTool.Controllers
{

    [Sitecore.Services.Core.ServicesController("rectool.context")]
    public class ApiController : Sitecore.Services.Infrastructure.Web.Http.ServicesApiController
    {
        const string TAGS = "__Semantics";

        // {44AB5107-3C73-42F0-A427-BEC549F944B9} - /sitecore/templates/System/Analytics/Profile Key 
        const string profileKeyTemplate = "{44AB5107-3C73-42F0-A427-BEC549F944B9}";
        const string profilesItem = "{12BD7E35-437B-449C-B931-23CFA12C03D8}"; // /sitecore/system/Marketing Control Panel/Profiles
        const string PROFILE_KEYS = "/sitecore/system/Marketing Control Panel/Profiles/Focus//*[@@templateid='{44AB5107-3C73-42F0-A427-BEC549F944B9}']";
        const string PERSONA_KEYS = "/sitecore/system/Marketing Control Panel/Profiles/Persona//*[@@templateid='{44AB5107-3C73-42F0-A427-BEC549F944B9}']";

        [HttpGet]
        public async Task<IHttpActionResult> Test(string id)
        {
            var database = Sitecore.Context.Database;
            var user = Sitecore.Context.User;
            var language = Sitecore.Context.Language;

            // Emulate async work
            await Task.Delay(500);

            return Ok(new
            {
                Id = id,
                DatabaseName = database.Name,
                User = user?.Name,
                Language = language.Name,
            });
        }
        
        [HttpGet]
        public async Task<IHttpActionResult> Tags(string id)
        {
            // todo move to sitecore helper
            Sitecore.Data.Database db = Sitecore.Context.Database;
            Item item = db.GetItem(new Sitecore.Data.ID(id));

            if (item.Fields[TAGS] == null) return null;

            MultilistField tags = item.Fields[TAGS];

            var tagNames = tags.GetItems().Select(tag => new { Id = tag.ID, TagName = tag.Name }).ToList();

            // Emulate async work
            await Task.Delay(50);

            return Ok(new
            {
                ContextItemId = id,
                Tags = tagNames
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Profiles(string id)
        {
            // todo move to sitecore helper
            Sitecore.Data.Database db = Sitecore.Context.Database;
            Item item = db.GetItem(new Sitecore.Data.ID(profilesItem));

            var profileKeys = Sitecore.Context.Database.SelectItems(PROFILE_KEYS).Select(el => new { ProfileKeyId = el.ID, ProfileKeyName = el.Name });

            // Emulate async work
            await Task.Delay(50);

            return Ok(new
            {
                ContextItemId = id,
                ProfileKeys = profileKeys
            });
        }

        [HttpGet]
        public async Task<IHttpActionResult> Dict(string id)
        {
            /*
            IDictionary<string, object> dictionary = new ExpandoObject();

            */
            // todo move to sitecore helper
            Sitecore.Data.Database db = Sitecore.Context.Database;

            var root = db.GetItem("/sitecore/system/Dictionary");
            // Emulate async work
            await Task.Delay(50);

            var items = root.Axes.GetDescendants()
               .Where(i => i.TemplateID == TemplateIDs.DictionaryEntry);

            foreach (var item in items)
            {
                var key = item[FieldIDs.DictionaryKey];
                if (key == id)
                    return Ok(new
                    {
                        Key = id,
                        Value = item[FieldIDs.DictionaryPhrase],
                        Result = "Success"
                    });
            }
            return Ok(new
            {
                Key = id,
                Value = string.Empty,
                Result = "Empty"
            });
        }

        [HttpPost]
        [ValidateHttpAntiForgeryToken]  // This attribute secures the method with Anti-CSRF
        public IHttpActionResult EditTags(string id, string[] tagsidlist)
        {
            // todo move to sitecore helper
            Sitecore.Data.Database db = Sitecore.Context.Database;
            Item item = db.GetItem(new Sitecore.Data.ID(id));

            if (item.Fields[TAGS] == null) return NotFound();

            MultilistField tags = item.Fields[TAGS];


            using (new SecurityDisabler())
            {
                item.Editing.BeginEdit();

                tags.Value = string.Empty;

                foreach (var str in tagsidlist)
                {
                    tags.Add(str);
                }

                try
                {
                    item[TAGS] = tags.ToString();
                }
                finally
                {
                    item.Editing.EndEdit();
                }
            }

            return ResponseMessage(Request.CreateResponse(HttpStatusCode.NoContent));
        }
    }
}