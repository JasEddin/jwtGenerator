using Microsoft.AspNetCore.Mvc;

namespace jwtGenerator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JwtGeneratorController : ControllerBase
    {
        private readonly TokenService _tokenService;

        public JwtGeneratorController(TokenService tokenService)    
        {
            _tokenService = tokenService;
        }
 
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TokenRequest request)
        {
            var result = await _tokenService.GenerateToken(request);
            return Ok(result);
        }
    }
}
