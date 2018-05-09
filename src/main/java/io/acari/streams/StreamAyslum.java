package io.acari.streams;

import com.google.common.collect.Lists;

import java.util.LinkedList;
import java.util.List;
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
//    This method does not actually reorder the elements; it just tells the JVM that if an
//    order-based stream operation is applied, the order can be ignored.
    StringBuilder twentyNumbers = Stream.iterate(1, a -> ++a)
        .unordered()
        .parallel()
        .limit(20)//Put it here results are undefined
        .map(number-> number + " ")
        .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
    System.out.println(twentyNumbers.toString());
    System.out.println();


    StringBuilder twentyNumbersAlwaysTheSame = Stream.iterate(1, a -> ++a)
        .limit(20)//Put it here results are defined
        .unordered()
        .parallel()
        .map(number-> number + " ")
        .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
    System.out.println(twentyNumbersAlwaysTheSame.toString());
    System.out.println();

    List<String> orderIsGreat = Lists.newArrayList("i cannot think of anything clever at the moment".split(" "))
        .stream()
        .collect(LinkedList::new, List::add, (listOne, listTwo) -> {
          System.out.println("Joining forks!");//neverGetsCalled
          listOne.addAll(listTwo);
        });

    System.out.println(orderIsGreat);
    System.out.println();

    List<String> thisShouldBeOrderedToo = Lists.newArrayList("i cannot think of anything clever at the moment".split(" "))
        .parallelStream()
        .collect(LinkedList::new, List::add, (listOne, listTwo) -> {
          System.out.println("Joining forks!");
          listOne.addAll(listTwo);
        });

    System.out.println(thisShouldBeOrderedToo);
    System.out.println();

    //map-reduce all substrings for type ahead
    //create a multi-map.
  }
}