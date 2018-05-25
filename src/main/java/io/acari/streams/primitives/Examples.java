package io.acari.streams.primitives;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Examples {

    public static void main(String... args) {
        Stream<String> streamOfAString = Stream.of("Hello World");

        streamOfAString.forEach(System.out::println);
        System.out.println();
        streamOfAString.forEach(stringToPrint -> System.out.println(stringToPrint));

        Stream<String> truthStream = Stream.of("streams", "are", "awesome");

        Stream<String> capitalizedTruthStream = truthStream.map(streamString ->
                streamString.substring(0, 1).toUpperCase() + streamString.substring(1));

        Stream<String> shatnerStream = capitalizedTruthStream
                .map(streamString -> streamString + "... ");

        shatnerStream.forEach(System.out::print);

        Stream.of("one", "two", "three", "four", "five")
                .filter(s -> s.length() > 3)
                .map(String::toUpperCase)
                .limit(2)
                .forEach(System.out::println);

        //////////

        Stream<String> truthStream_ = Stream.of("streams", "are", "awesome");

        Stream<String> capitalizedTruthStream_ = truthStream_.map(streamString ->
                streamString.substring(0, 1).toUpperCase() + streamString.substring(1));

        Stream<String> shatnerStream_ = capitalizedTruthStream_
                .map(streamString -> streamString + "...");

        String truthStreamMessage = shatnerStream_
                .reduce("", (identity, streamString) -> identity + " " + streamString);

        System.out.println("\"" + truthStreamMessage + "\"");//todo: make note of needing to trim

        String itsSomething = Stream.<String>empty()
                .reduce("well you got this", String::concat);


        List<Integer> theNumbersMason = Stream.iterate(1, a -> ++a)
                .limit(30)
                .collect(Collectors.toList());

        theNumbersMason.stream()
                .map(number -> number + " ")
                .forEach(System.out::print);
        System.out.println();


        Map<Character, List<Character>> allGroupedTogether = "acoedgadlaoldgaeodglaeldgaoldgaodlgadlgabulaubalulbarulgrauilgrigrlcihaseu".chars()
                .mapToObj(i -> (char) i)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.toList()));

        System.out.println(allGroupedTogether);
        System.out.println();


        ////////////

        Map<Integer, Set<String>> loudSets = Stream.of("ao e aueta ustna ts naeua euae unaue sat uebsea uobtao eubtna ouebnhtae uotn".split(" "))
                .collect(Collectors.groupingBy(String::length,
                        Collectors.mapping(String::toUpperCase, Collectors.toSet())));

        System.out.println(loudSets);
        System.out.println();





    }
}
