package io.acari.streams;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamDreams {

  public static void main(String... args) {
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

    ////////////////////


    System.out.println("\"" + truthStreamMessage + "\"");//todo: make note of needing to trim
    System.out.println();

    String itsSomething = Stream.<String>empty()
        .reduce("well you got this", String::concat);

    System.out.println(itsSomething);
    System.out.println();

    Optional<String> probablyNothing = Stream.<String>empty()
        .reduce(String::concat);

    probablyNothing.ifPresent(System.out::println);

    System.out.println("*NOTHING*");
    System.out.println();

    String stringReduce = Stream.iterate(1, a->++a)
        .limit(10)
        .reduce("You Stream was: ",
            (string, number)-> string + number,
            String::concat);

    System.out.println(stringReduce);
    System.out.println();



    LinkedList<Integer> numbers = Stream.iterate(1, a -> ++a)
        .limit(6)
        .collect(
            () -> new LinkedList<>(),//Supplies the collection to store results
            (list, streamItem) -> list.add(streamItem),//mutates the collection
            (listOne, listTwo) -> listOne.addAll(listTwo)//merges multiple data collections into one
            //This will be covered in stream intervention
        );

    numbers.stream()
        .map(number -> number + " ")
        .forEach(System.out::print);
    System.out.println();


    List<Integer> theNumbersMason = Stream.iterate(1, a -> ++a)
        .limit(30)
        .collect(Collectors.toList());

    theNumbersMason.stream()
        .map(number -> number + " ")
        .forEach(System.out::print);
    System.out.println();

    System.out.println(theNumbersMason.getClass());
    System.out.println();

    //tomorrow alex start here with introducing flatmap <-----

    Integer[][] arraysAreCool = new Integer[][]{
        {1,2,3,4,5},
        {6,7,8,9,10}
    };

    Arrays.stream(arraysAreCool)
        .map(Arrays::toString)
        .forEach(System.out::print);
    System.out.println();
    System.out.println();

    List<Integer> iHeardYouLikedStreams = Arrays.stream(arraysAreCool)
        .map(Arrays::stream)//yo dog
        .peek(stream-> {
          System.out.println(stream);
          System.out.println();
        })
        .flatMap(stream -> stream)
        .peek(System.out::println)
        .collect(Collectors.toList());

    System.out.println(iHeardYouLikedStreams);
    System.out.println();



    List<Integer> theBestCollection = Stream.iterate(1, a -> ++a)
        .limit(30)
        .collect(Collectors.toCollection(LinkedList::new));//todo: bring this up once flatmap comes around.

    theBestCollection.stream()
        .map(number -> number + " ")
        .forEach(System.out::print);
    System.out.println();
    System.out.println(theBestCollection.getClass());
    System.out.println();


    Set<Character> theBestSet = "THIS PROBABLY HAS SOME OF THE SAME CHARACTERS"
        .chars()
        .mapToObj(character->(char)character)
        .collect(Collectors.toCollection(HashSet::new));

    System.out.println(theBestSet);
    System.out.println(theBestSet.getClass());
    System.out.println();

    String alphabetSoup = Stream.iterate(97, a->++a)
        .limit(26)
        .map(i->(char)i.intValue())
        .map(String::valueOf)
        .collect(Collectors.joining(", "));

    System.out.println(alphabetSoup);
    System.out.println();

    String allCapsSoup = Stream.iterate(65, a->++a)
        .limit(26)
        .map(i->(char)i.intValue())
        .map(String::valueOf)
        .collect(Collectors.joining());

    System.out.println(allCapsSoup);
    System.out.println();

    Map<Boolean, List<Character>> ocdAlphabetSoup = Stream.iterate(50, a->++a)
        .limit(100)
        .map(i->(char)i.intValue())
        .collect(Collectors.<Character>partitioningBy(Character::isAlphabetic));

    System.out.println(ocdAlphabetSoup);
    System.out.println();

    Map<Boolean, Set<Character>> ocdSetAlphabetSoup = "ulaocedulc'dlc3d4lul.bkl891[98pbklaerbcjlk289g3pblka98dlerbasep".chars()
        .mapToObj(i->(char)i)
        .collect(Collectors.partitioningBy(c->Character.isAlphabetic(c), Collectors.toSet()));

    System.out.println(ocdSetAlphabetSoup);
    System.out.println();

    Map<Character, List<Character>> allGroupedTogether = "acoedgadlaoldgaeodglaeldgaoldgaodlgadlgabulaubalulbarulgrauilgrigrlcihaseu".chars()
        .mapToObj(i -> (char) i)
        .collect(Collectors.groupingBy(Function.identity(), Collectors.toList()));

    System.out.println(allGroupedTogether);
    System.out.println();

    Map<Integer, String> collect = Stream.of("aoestuh santoeh usntahoesn tuhantoe unst ahsn ethseo auhtuao etnoua bau ohba ouhtba uthna ubnht ueaothn".split(" "))
        .collect(Collectors.toMap(String::length, Function.identity(), (a,__)->a));

    System.out.println(collect);
    System.out.println(collect.getClass());
    System.out.println();

    Map<Integer, String> linkToThePast = Stream.of("aoestuh santoeh usntahoesn tuhantoe unst ahsn ethseo auhtuao etnoua bau ohba ouhtba uthna ubnht ueaothn".split(" "))
        .collect(Collectors.toMap(String::length, Function.identity(), (a,__)->a, LinkedHashMap::new));

    System.out.println(linkToThePast);
    System.out.println(linkToThePast.getClass());
    System.out.println();
  }
}
