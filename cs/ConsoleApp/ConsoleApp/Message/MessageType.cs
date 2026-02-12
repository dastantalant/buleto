using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum MessageType
{
    [EnumMember(Value = "factors")]
    Factor, 
    [EnumMember(Value = "round")]
    Round,
    [EnumMember(Value = "last-results")]
    LastResult
}