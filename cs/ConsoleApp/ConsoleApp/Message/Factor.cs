using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

public class Factor
{
    [JsonPropertyName("dt")]
    public DateTimeOffset DateTime { get; set; }

    [JsonPropertyName("v")]
    public double Value { get; set; }
}
