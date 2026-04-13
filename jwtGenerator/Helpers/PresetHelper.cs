namespace jwtGenerator.Helpers
{
    // Helpers/PresetHelper.cs
    public static class PresetHelper
    {
        public static Dictionary<string, string> GetPreset(string preset)
        {
            return preset switch
            {
                "individual" => new Dictionary<string, string>
            {
                { "sub_type", "NationalIdentificationNumber" },
                { "trust_level", "High" },
                { "auth", "Bankid" },
                { "channel", "INTERNAL_WEB" },
                { "same_device", "True" },
                { "qr_code", "False" },
                { "ext_auth", "OtpSms" }
            },

                "officer" => new Dictionary<string, string>
            {
                { "sub_type", "HandlingOfficer" },
                { "trust_level", "High" },
                { "auth", "Kerberos" },
                { "channel", "INTERNAL_WEB" }
            },

                "system" => new Dictionary<string, string>
            {
                { "sub_type", "HandlingOfficer" },
                { "trust_level", "High" },
                { "auth", "Kerberos" },
                { "channel", "INTERNAL_WEB" }
            },

                _ => new Dictionary<string, string>()
            };
        }
    }
}
