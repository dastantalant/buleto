using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

public class Cell
{
    [JsonPropertyName("c")] public int Value { get; set; }
    [JsonPropertyName("vt")] public double Target { get; set; }
    [JsonPropertyName("vf")] public double Factor { get; set; }
}