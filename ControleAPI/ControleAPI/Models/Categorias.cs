using System.ComponentModel.DataAnnotations;

namespace ControleAPI.Models
{
    public class Categorias
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Categoria { get; set; }

        public ICollection<Despesas> Despesas { get; set; }
    }
}
