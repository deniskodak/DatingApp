using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [MaxLength(100)]
    public required string Username { get; set; }

    [Required] // it is a validator
    public required string Password { get; set; } //here the required keyword is needed for complier
}
