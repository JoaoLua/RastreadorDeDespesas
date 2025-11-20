using ControleAPI.Models;

namespace ControleAPI.Repositories.Interfaces
{
    public interface ICategoriasRepository
    {
        Task<IEnumerable<Categorias>> GetAllCategoriasAsync();
        Task<Categorias?> GetCategoriaByIdAsync(int id);
    }
}
