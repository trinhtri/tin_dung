﻿using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ManagerCV.Authorization.Roles;
using ManagerCV.Authorization.Users;
using ManagerCV.MultiTenancy;
using ManagerCV.Models;

namespace ManagerCV.EntityFrameworkCore
{
    public class ManagerCVDbContext : AbpZeroDbContext<Tenant, Role, User, ManagerCVDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<CtgLanguage> CtgLanguage { get; set; }
        public virtual DbSet<SysConfigToSendMail> SysConfigToSendMails { get; set; }
        public virtual DbSet<EmployeeLanguage> EmployeeLanguages { get; set; }
        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<SendCV> SendCV { get; set; }
        public ManagerCVDbContext(DbContextOptions<ManagerCVDbContext> options)
            : base(options)
        {
        }
    }
}
