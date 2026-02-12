using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

public class VictoryCell
{
    [JsonPropertyName("dt")] public DateTimeOffset DateTime { get; set; }
    [JsonPropertyName("c")] public int Cell { get; set; }
    [JsonPropertyName("v")] public double Value { get; set; }
}