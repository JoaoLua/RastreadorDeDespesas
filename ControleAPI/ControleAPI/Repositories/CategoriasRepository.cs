using ControleAPI.Data;
using ControleAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleAPI.Repositories
{
    public class CategoriasRepository : ICategoriasRepository
    {
        private readonly AppDbContext _context;
        public CategoriasRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Models.Categorias>> GetAllCategoriasAsync()
        {
            return await _context.Categorias.OrderBy(c => c.Categoria).ToListAsync();
        }
        public async Task<Models.Categorias?> GetCategoriaByIdAsync(int id)
        {
            return await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);
        }

    }
}
