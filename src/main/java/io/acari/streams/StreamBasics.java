package io.acari.streams;

import java.awt.*;
import java.awt.geom.Point2D;
import java.util.Optional;
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
        .map(streamString -> streamString + "... ");

    shatnerStream.forEach(System.out::print);
    //NOTE: By default streams are ordered and are processed from left to right.

    System.out.println();
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
    System.out.println();


    //SOURCE
    //Creates a INFINITE stream of annoying strings.
    Stream<String> roadtripStream = Stream.generate(() -> "Are we there yet?");

    //INTERMEDIATE FUNCTION.
    //Limits the stream to at most 10 items.
    //Does not execute the stream.
    Stream<String> toleranceStream = roadtripStream
        .map(question -> question + " No.")
        .limit(10);
    toleranceStream.forEach(System.out::println);

    System.out.println("Okay I have had enough");
    System.out.println();

    Stream.of("one","two","three")
        .limit(10)
        .forEach(System.out::println);

    System.out.println("Done Counting!");
    System.out.println();

    Stream.of("One,two,skip,my,shoe".split(","))
        .skip(3)
        .forEach(System.out::println);

    System.out.println("Done Skipping!");
    System.out.println();

    Stream.of("One,two,skip,my,shoe".split(","))
        .skip(10)
        .forEach(System.out::println);

    System.out.println("Skipped all of the things!");
    System.out.println();


    Stream<String> questionsOfLife = Stream.generate(() -> "Do you know the way?");

    Optional<String> lostTraveler = questionsOfLife.findFirst();

    lostTraveler.ifPresent(System.out::println);

    System.out.println("Asks the lost traveler");
    System.out.println();

    Stream<String> noQuestions = Stream.empty();

    Optional<String> saidNoOne = noQuestions.findAny();

    saidNoOne.ifPresent(System.out::println);

    System.out.println("Said no one, ever");
    System.out.println();

    boolean allMatched = Stream.iterate(1, a-> ++a)
        .limit(5)
        .peek(System.out::println)
        .allMatch(i -> i < 7);

    System.out.println("All of the numbers were less than 7: " + allMatched);
    System.out.println();


    boolean nonMatch = Stream.iterate(1, a-> ++a)
        .limit(5)
        .peek(System.out::println)
        .allMatch(i -> i < 0);

    System.out.println("All of the numbers were less than 7: " + nonMatch);
    System.out.println();

    System.out.println("Any numbers where even: " + Stream.iterate(1, a-> a+3)
        .anyMatch(i-> i%2==0));
    System.out.println();


    System.out.println("Convoluted word count: " +
        Stream.of("This was totally necessary, for serious".split(" ")).count());

    System.out.println();

    System.out.println("The largest word in the sentence is: " +
        Stream.of("This was totally necessary, for serious".split(" "))
            .max((stringOne, stringTwo)-> stringOne.compareTo(stringTwo)));

    System.out.println();

    System.out.println("The smallest word in the sentence is: " +
        Stream.of("This was totally necessary, for serious".split(" "))
            .min(String::compareTo));
    System.out.println();
  }

  //todo: remember when creating lambdas to watchout for names and scope collisions
}
