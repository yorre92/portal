using System.ComponentModel.DataAnnotations;

namespace portal.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}