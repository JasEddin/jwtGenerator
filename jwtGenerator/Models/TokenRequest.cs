

public class TokenRequest
{
    public string Environment { get; set; }
    public string Preset { get; set; }  // individual, officer, system...
    public string NationalId { get; set; }
    public string? ActAsPnr { get; set; }
    public Dictionary<string, string> Parameters { get; set; } = new();

}


