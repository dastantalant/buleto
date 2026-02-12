using System.Security.Cryptography;

namespace ConsoleApp;

public class CryptoRandom
{
    private readonly RandomNumberGenerator _rng = RandomNumberGenerator.Create();

    public double Spin(double min, double max)
    {
        if (min >= max)
            throw new ArgumentException("min must be less than max");
        var bytes = new byte[8];
        _rng.GetBytes(bytes);
        var randomUInt64 = BitConverter.ToUInt64(bytes, 0);
        var randomDouble = randomUInt64 / (double)ulong.MaxValue;
        return Math.Round(min + (randomDouble * (max - min)), 5);
    }

    public double SpinAlternative(double min, double max)
    {
        if (min >= max)
            throw new ArgumentException("min must be less than max");
        var randomInt = RandomNumberGenerator.GetInt32(0, int.MaxValue);
        var normalized = randomInt / (double)(int.MaxValue - 1);
        return Math.Round(min + (normalized * (max - min)), 5);
    }

    public double SpinInRange()
    {
        const double min = 5.15000;
        const double max = 5.45999;
        return Spin(min, max);
    }
}