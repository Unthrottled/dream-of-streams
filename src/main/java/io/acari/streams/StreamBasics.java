package io.acari.streams;

import java.awt.*;
import java.awt.geom.Point2D;
import java.util.stream.Stream;

public class StreamBasics {

  public static void main(String... args) {
    //Creates a stream SOURCE of just a String
    Stream<String> streamOfAString = Stream.of("Hello World");

    //TERMINAL OPERATION
    //For Entry within this stream apply
    //each string to the method System.out.println();
    streamOfAString.forEach(System.out::println);
    System.out.println();

    try {
      streamOfAString.forEach(stringToPrint -> System.out.println(stringToPrint));
    } catch (IllegalStateException ignored) {
      System.out.println("Only one terminal operatian can be applied to a" +
          " stream, streams are not re-usable.");
      System.out.println();
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
    System.out.println();

    Stream<Shape> shapeStream = Stream.of(
        new Rectangle(0, 0, 2, 2) {
          @Override
          public String toString() {
            return "Steve";
          }
        },
        new Rectangle(0, 0, 3, 3) {
          @Override
          public String toString() {
            return "Jerry";
          }
        },
        new Polygon(new int[]{-10, 10, 0, -10},
            new int[]{0, 0, 10, 0}, 4) {
          @Override
          public String toString() {
            return "Phil";
          }
        });

    //INTERMEDIATE OPERATION
    //Peek allows us to take a look at all of the
    //items that have made it through the stream so far.
    //Since it is a INTERMEDIATE OPERATION
    //it does not cause the stream to execute
    Stream<Shape> peekedShapes = shapeStream.peek(shape -> System.out.println(shape + " is about to be measured."));

    Point2D youMustBeThisTall = new Point2D.Double(0,2.5d);

    //INTERMEDIATE OPERATION
    //Filter allows us to take the current stream item
    //look at it, and determin wether we want it to
    //continue downstream. We return true if we want it to continue
    //or false if IT SHALL NOT PASS!!!!
    Stream<Shape> tallShapes = peekedShapes
        .filter(shape -> shape.contains(youMustBeThisTall));

    tallShapes
        .map(Object::toString)//converts any shapes that make it pass into a string!
        .map(tallEnoughShapeName-> tallEnoughShapeName + " is tall enough!")//turns each stream into a message!
        .forEach(System.out::println);


    System.out.println("All of the shapes have been measured");
  }

  //todo: remember when creating lambdas to watchout for names and scope collisions
}
