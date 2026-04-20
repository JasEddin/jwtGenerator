namespace jwtGenerator.Helpers
{
    // Helpers/PresetHelper.cs
    public static class PresetHelper
    {
        public static Dictionary<string, string> GetPreset(string preset, string? actAsPnr)
        {

            Dictionary<string, string> result;
            switch (preset)
            {
                case "individual":
                    result = new Dictionary<string, string>
                    {
                        { "sub_type", "NationalIdentificationNumber" },
                        { "trust_level", "High" },
                        { "auth", "Bankid" },
                        { "channel", "INTERNAL_WEB" },
                        { "same_device", "True" },
                        { "qr_code", "False" },
                        { "ext_auth", "OtpSms" }
                    };
                    break;
                case "officer":
                    result = new Dictionary<string, string>
                    {
                        { "sub_type", "HandlingOfficer" },
                        { "trust_level", "High" },
                        { "auth", "Kerberos" },
                        { "channel", "INTERNAL_WEB" }
                    };

                    if (!string.IsNullOrEmpty(actAsPnr))
                    {
                        result["act_sub"] = actAsPnr;
                        result["act_sub_type"] = "NationalIdentificationNumber";
                        result["act_act_sub"] = "LEK001";
                        result["act_act_sub_type"] = "HandlingOfficer";
                    }
                    break;
                case "system":
                    result = new Dictionary<string, string>
                    {
                        { "sub_type", "HandlingOfficer" },
                        { "trust_level", "High" },
                        { "auth", "Kerberos" },
                        { "channel", "INTERNAL_WEB" }
                    };
                    break;
                default:
                    result = new Dictionary<string, string>();
                    break;
            }
            return result;
        }
    }
}
