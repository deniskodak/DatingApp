using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//localhost:5001/api/users
[Authorize]
public class UsersController(IUserRepository userRepository) : BaseApiController
{

    // [AllowAnonymous] // allow to access it without authorization, default
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        // return users; same as code below by default
        return Ok(users);
    }

    [HttpGet("{username}")] // api/users/boby
    public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
    {
        var user = await userRepository.GetMemberAsync(username);
        if (user == null) return NotFound();

        return user;
    }
}
