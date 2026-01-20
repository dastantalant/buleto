package com.traderoom.strategy.library;

import java.nio.ByteBuffer;


public class ByteBufferTest {

    public static void main(String[] args) {
        //byteBuffer 할당
        ByteBuffer byteBuffer = ByteBuffer.allocate(11);
        System.out.println("byteBuffer is direct buffer : " + byteBuffer.isDirect());
        System.out.println("byteBuffer capacity is : " + byteBuffer.capacity());
        System.out.println("byteBuffer initial value : " + byteBuffer);

        //값 할당
        byte[] bytes = "Netty".getBytes();
        for (byte b : bytes) {
            byteBuffer.put(b);
            System.out.println("#byteBuffer value : " + byteBuffer);
        }

        //java.nio.BufferUnderflowException
        //byteBuffer.get();

        // position to zero
        byteBuffer.rewind();

        System.out.println((char) byteBuffer.get());
        System.out.println("after get, byteBuffer value 0 : " + byteBuffer);

        System.out.println((char) byteBuffer.get());
        System.out.println("after get, byteBuffer value 1 : " + byteBuffer);

        // limit -> position & position -> 0
        byteBuffer.flip();

        System.out.println(byteBuffer);

        System.out.println((char) byteBuffer.get(1));
    }
}