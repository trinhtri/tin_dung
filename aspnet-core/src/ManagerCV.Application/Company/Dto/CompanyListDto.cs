using Abp.Domain.Entities;

namespace ManagerCV.Company.Dto
{
   public class CompanyListDto: Entity
    {
        public string TenCTy { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public string SoUVTT { get; set; }
        public string Note { get; set; }
        public string ContentTypeHD { get; set; }
        public string HopDong { get; set; }
        public string ContentTypeTT { get; set; }
        public string ThanhToan { get; set; }

    }
}
