package com.traderoom.strategy.library;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufAllocator;
import io.netty.buffer.Unpooled;

import java.nio.ByteBuffer;
import java.nio.charset.Charset;

public class ByteBufTest {
    public static void main(String[] args) {
        // 4 types of buffers
        ByteBuf heapBufferInPool = ByteBufAllocator.DEFAULT.heapBuffer(11);
        ByteBuf directBufferInPool = ByteBufAllocator.DEFAULT.directBuffer(11);
        ByteBuf heapBufferNotInPool = Unpooled.buffer(11);
        ByteBuf directBufferNotInPool = Unpooled.directBuffer(11);

        // how to manipulate buffer
        ByteBuf byteBuf = ByteBufAllocator.DEFAULT.heapBuffer(11);

        System.out.println(byteBuf.capacity());
        System.out.println(byteBuf.isDirect());
        byteBuf.writeInt(65537);
        System.out.println("readable bytes : " + byteBuf.readableBytes());
        System.out.println("writable bytes : " + byteBuf.writableBytes());
        System.out.println("is readable : " + byteBuf.isReadable());

        byteBuf.clear();
        System.out.println("readable bytes : " + byteBuf.readableBytes());
        System.out.println("writable bytes : " + byteBuf.writableBytes());

        String sourceString = "hello netty";

        byteBuf.writeBytes(sourceString.getBytes());

        System.out.println("readable bytes : " + byteBuf.readableBytes());
        System.out.println("writable bytes : " + byteBuf.writableBytes());

        System.out.println(byteBuf.toString(Charset.defaultCharset()));

        //change capacity
        byteBuf.capacity(6);
        System.out.println(byteBuf.toString(Charset.defaultCharset()));

        byteBuf.capacity(13);
        System.out.println(byteBuf.toString(Charset.defaultCharset()));
        byteBuf.writeBytes("world".getBytes());
        System.out.println(byteBuf.toString(Charset.defaultCharset()));

        //convert byteBuffer to byteBuf
        ByteBuffer byteBuffer = ByteBuffer.wrap("hi".getBytes());
        ByteBuf buf = Unpooled.wrappedBuffer(byteBuffer);
        System.out.println(buf.toString(Charset.defaultCharset()));

    }
}