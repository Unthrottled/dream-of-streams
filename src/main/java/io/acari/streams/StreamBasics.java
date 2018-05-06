package io.acari.streams;

import java.util.stream.Stream;

public class StreamBasics {

  public static void main(String... args) {
    //Creates a stream SOURCE of just a String
    Stream<String> streamOfAString = Stream.of("Hello World");

    //TERMINAL OPERATION
    //For Entry within this stream apply
    //each string to the method System.out.println();
    streamOfAString.forEach(System.out::println);

    try {
      streamOfAString.forEach(stringToPrint -> System.out.println(stringToPrint));
    } catch (IllegalStateException ignored) {
      System.out.println("Only one terminal operatian can be applied to a" +
          " stream, streams are not re-usable.");
    }


    Stream<String> truthStream = Stream.of("streams", "are", "awesome");

    //INTERMEDIATE OPERATION
    //Does not execute the stream process
    //But applies a function that takes a string and
    //Capitalizes the first letter and returns that value to
    //to be processed by the further methods downstream.
    Stream<String> capitalizedTruthStream = truthStream.map(streamString ->
        streamString.substring(0, 1).toUpperCase() + streamString.substring(1));

    //postfixes ever string in the stream with a "..."
    Stream<String> shatnerStream = capitalizedTruthStream
        .map(streamString -> streamString + "...");

    //TERMINAL OPERATION
    //Reduces the stream into one string by first starting
    //with the Identity string (the base string)
    //and post-fixes each incoming string and returns that as the
    //new identity result.
    String truthStreamMessage = shatnerStream
        .reduce("", (identity, streamString) -> identity + " " + streamString);
    //NOTE: By default streams are ordered and are processed from left to right.

    System.out.println("\"" + truthStreamMessage + "\"");//todo: make note of needing to trim
  }

  //todo: remember when creating lambdas to watchout for names and scope collisions
}
