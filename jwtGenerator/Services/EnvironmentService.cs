using jwtGenerator.Models;

namespace jwtGenerator.Services
{
    public static class EnvironmentService
    {
        public static string GetUrl(string env)
        {
            switch (env)
            {
                case Env.Stable:
                case Env.U3:
                case Env.U4:
                case Env.U5:
                case Env.Ct2:
                case Env.Ct3:
                case Env.Ct4:
                case Env.Ct5:
                    return $"https://csts-test.skandia.se/{env}/oauth/v2/oauth-token/mock";
                case Env.Lab:
                    return $"https://csts-lab.skandia.se/{env}/oauth/v2/oauth-token/mock";
                default:
                    throw new ArgumentException($"Invalid environment: {env}");
            }

        }
    }
}
