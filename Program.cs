using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Serve the project root as a static site so the HTML pages, CSS, JS,
// and reusable component partials can all be loaded by the browser.
var siteRoot = app.Environment.ContentRootPath;

app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = new PhysicalFileProvider(siteRoot),
    RequestPath = ""
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(siteRoot),
    RequestPath = ""
});

app.Run();
