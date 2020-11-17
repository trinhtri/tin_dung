using Abp.Domain.Entities;

namespace ManagerCV.Company.Dto
{
   public class CompanyListDto: Entity
    {
        public string TenCTy { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string SoUVUT { get; set; }
        public string VTUVUT { get; set; }
    }
}
