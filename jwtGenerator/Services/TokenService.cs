// Services/TokenService.cs
using jwtGenerator.Services;

public class TokenService
{
    private readonly HttpClient _httpClient;

    public TokenService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GenerateToken(TokenRequest request)
    {
        var url = EnvironmentService.GetUrl(request.Environment);

        var formData = new Dictionary<string, string>
        {
            { "clientid", "i_web_individual_short" },
            { "client_secret", "mysecret" },
            { "preset", request.Preset },
            { "grant_type", "client_credentials" },
            { "sub", request.Sub },
            { "national_id", request.NationalId },
            { "scope", request.Scope },
            { "trust_level", "Medium" },
            { "client_id", "i_mock_short" }
        };

        var content = new FormUrlEncodedContent(formData);

        var response = await _httpClient.PostAsync(url, content);

        var result = await response.Content.ReadAsStringAsync();

        return result;
    }
}