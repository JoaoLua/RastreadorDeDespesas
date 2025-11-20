using ControleAPI.Data;
using ControleAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleAPI.Repositories.Interfaces
{
    public class DespesasRepository : IDespesasRepository
    {
        private readonly AppDbContext _context;
        public DespesasRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Despesas>> GetAllDespesasAsync()
        {
            // O Include é essencial para preencher o objeto Categoria dentro da Despesa
            return await _context.Despesas
                .Include(d => d.Categoria)
                .OrderByDescending(d => d.Data)
                .ToListAsync();
        }

        public async Task<Despesas?> GetDespesaByIdAsync(int id)
        {
            return await _context.Despesas
                .Include(d => d.Categoria)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Despesas> AddDespesaAsync(Despesas despesa)
        {
            await _context.Despesas.AddAsync(despesa);
            await _context.SaveChangesAsync();
            return despesa;
        }

        public async Task<Despesas> UpdateDespesaAsync(Despesas despesa)
        {
            _context.Despesas.Update(despesa);
            await _context.SaveChangesAsync();
            return despesa;
        }

        public async Task<bool> DeleteDespesaAsync(int id)
        {
            var despesa = await _context.Despesas.FindAsync(id);
            if (despesa == null) return false;

            _context.Despesas.Remove(despesa);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
