 
public class TokenRequest
{
    public string Environment { get; set; } = "u4"; // u3, u4, ct2...

    //Customer,Officer,System, Other
    public string Preset { get; set; } = "individual";

    public string Sub { get; set; } = "";
    public string NationalId { get; set; } = "";
    public string Scope { get; set; } = "account_read system_read";
}§