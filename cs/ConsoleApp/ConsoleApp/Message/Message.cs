namespace ConsoleApp.Message;

using System.Text.Json.Serialization;

public sealed class RoundMessage : IMessage
{
    [JsonPropertyName("type")]
    public string TypeRaw { get; init; } = null!;

    [JsonIgnore]
    public MessageType Type => MessageType.Round;

    [JsonPropertyName("data")]
    public Round Data { get; init; } = null!;
}


public sealed class FactorMessage : IMessage
{
    [JsonPropertyName("type")]
    public string TypeRaw { get; init; } = null!;

    [JsonIgnore]
    public MessageType Type => MessageType.Factor;

    [JsonPropertyName("data")]
    public List<Factor> Data { get; init; } = [];
}


public sealed class LastResultMessage : IMessage
{
    [JsonPropertyName("type")]
    public string TypeRaw { get; init; } = null!;

    [JsonIgnore]
    public MessageType Type => MessageType.LastResult;

    [JsonPropertyName("data")]
    public List<LastResult> Data { get; init; } = [];
}
