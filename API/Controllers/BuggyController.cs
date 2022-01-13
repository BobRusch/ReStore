using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseAPIController
  {
    [HttpGet("not-found")]
    public ActionResult GetNotFound() => NotFound();
    [HttpGet("bad-request")]
    public ActionResult GetBadRequest() => BadRequest(new ProblemDetails{ Title = "This is a bad request"});
    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized() => Unauthorized();
    [HttpGet("validation-error")]
    public ActionResult GetValidationError() {
        ModelState.AddModelError("Problem1", "This is the first error");
        ModelState.AddModelError("Problem2", "This is the second error");
        ModelState.AddModelError("Problem3", "This is the third error");
        ModelState.AddModelError("Problem4", "This is the fourth error");
        return ValidationProblem();
    }
    
    [HttpGet("server-error")]
    public ActionResult GetSererError() {
      throw new Exception("This is a server error");
    }
  }
}