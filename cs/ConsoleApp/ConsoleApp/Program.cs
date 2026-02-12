namespace ConsoleApp;

public static class Program
{
    static async Task Main()
    {
        await WebSocketClient.ConnectAndListenAsync();
    }
}