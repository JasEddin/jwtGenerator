

public class TokenRequest
{
    public string Environment = "u4"; // u3, u4, ct2...
    public string Preset { get; set; } = "individual"; // individual, officer, system...
    public string NationalId { get; set; }
    public Dictionary<string, string> Parameters { get; set; } = new();

}


