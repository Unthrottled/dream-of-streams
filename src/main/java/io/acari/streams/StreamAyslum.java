package io.acari.streams;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamAyslum {

  public static void main(String... args){
    //Nest collectors.
    Map<Integer, Set<String>> loudSets = Stream.of("ao e aueta ustna ts naeua euae unaue sat uebsea uobtao eubtna ouebnhtae uotn".split(" "))
        .collect(Collectors.groupingBy(String::length,
            Collectors.mapping(String::toUpperCase, Collectors.toSet())));

    System.out.println(loudSets);
    System.out.println();

    Map<Integer, Set<String>> loudSetsReadable = Stream.of("ao e aueta ustna ts naeua euae unaue sat uebsea uobtao eubtna ouebnhtae uotn".split(" "))
        .map(String::toUpperCase)
        .collect(Collectors.groupingBy(String::length, Collectors.toSet()));

    System.out.println(loudSets);
    System.out.println();


    //Concurrently

    //map-reduce all substrings for type ahead
    //create a multi-map.
  }
}
