using jwtGenerator.Helpers;
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
 
        var formData = new Dictionary<string, string> {
        { "clientid", "i_web_individual_short" },
        { "client_secret", "mysecret" },
        { "grant_type", "client_credentials" },
        { "client_id", "i_mock_short" }};

        PresetHelper.GetPreset(request.Preset, request.ActAsPnr )
            .ToList()
            .ForEach(kv => formData[kv.Key] = kv.Value);

        request.Parameters.ToList().ForEach(kv => formData[kv.Key] = kv.Value);

        var content = new FormUrlEncodedContent(formData);

        var response = await _httpClient.PostAsync(url, content);

        var result = await response.Content.ReadAsStringAsync();

        return result;
    }
}