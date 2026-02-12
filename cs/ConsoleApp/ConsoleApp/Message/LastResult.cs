using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

public class LastResult
{
    [JsonPropertyName("dt")] public DateTimeOffset DateTime { get; set; }
    [JsonPropertyName("v")] public double Value { get; set; }
    [JsonPropertyName("c")] public int Cell { get; set; }
}