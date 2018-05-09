package io.acari.streams;

import com.google.common.collect.LinkedListMultimap;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamAyslum {

  public static void main(String... args) {
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
        .map(number -> number + " ")
        .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
    System.out.println(twentyNumbers.toString());
    System.out.println();


    StringBuilder twentyNumbersAlwaysTheSame = Stream.iterate(1, a -> ++a)
        .limit(20)//Put it here results are defined
        .unordered()
        .parallel()
        .map(number -> number + " ")
        .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
    System.out.println(twentyNumbersAlwaysTheSame.toString());
    System.out.println();

    Optional<Integer> smittyWerbenjagemangensen = Stream.iterate(1, a -> ++a)
        .limit(30)
        .collect(Collectors.toList())
        .stream()
        .findAny();

    smittyWerbenjagemangensen.ifPresent(System.out::println);
    System.out.println();

    Optional<Integer> probablyNotNumberOne = Stream.iterate(1, a -> ++a)
        .limit(30)
        .collect(Collectors.toList())
        .stream()
        .parallel()
        .findAny();//JVM selects the first thread to finish the task and retrieves its data

    probablyNotNumberOne.ifPresent(System.out::println);
    System.out.println();

//    Any stream operation that is based on order, including findFirst() , limit() , or
//    skip() , may actually perform more slowly in a parallel environment.
//    This is a result of a parallel processing task being forced to coordinate all of its threads in a synchronized-like
//    fashion.

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


    System.out.println(Collectors.toList().characteristics());
    System.out.println(Collectors.toMap(Function.identity(), Function.identity())
        .characteristics());
    //the only two concurrent
    System.out.println(Collectors.toConcurrentMap(Function.identity(), Function.identity())
        .characteristics());
    System.out.println(Collectors.groupingByConcurrent(Function.identity(), Collectors.toSet())
        .characteristics());

    LinkedList<Integer> list = Stream.iterate(1, a -> ++a)
        .limit(10000)
        .collect(Collectors.toCollection(LinkedList::new));

    IntStream.rangeClosed(0, 25)
        .forEach(__ -> {
          LinkedList<String> listToMakeAList = list
              .parallelStream()
              .map(String::valueOf)
              .collect(LinkedList::new, List::add, LinkedList::addAll);
          System.out.println(listToMakeAList);
        });

    System.out.println("Done");

    //show the fork join stuffs
    IntStream.rangeClosed(0, 10)
        .peek(__ -> System.out.println("Non-Parallel stream: " + Thread.currentThread()))
        .reduce(0, (a, b) -> a + b);

    System.out.println();

    IntStream.rangeClosed(0, 10)
        .unordered()
        .parallel()
        .peek(__ -> System.out.println("Parallel stream: " + Thread.currentThread()))
        .reduce(0, (a, b) -> a + b);

    System.out.println();

    //map-reduce all substrings for type ahead
    //create a multi-map.

    Multimap<Integer, Character> multimap = IntStream.rangeClosed(0, 26)
        .boxed()
        .flatMap(number -> Stream.generate(() -> number)
            .limit(number))
        .collect(LinkedListMultimap::create, (map, number) -> {
          map.put(number, (char) (number + 96));
        }, Multimap::putAll);

    System.out.println(multimap);
    System.out.println();

    Map<Integer, List<Character>> collect = IntStream.rangeClosed(0, 26)
        .boxed()
        .map(integer -> Stream.generate(() -> integer).limit(integer))
        .flatMap(tStream -> tStream)
        .collect(Collectors.groupingBy(Function.identity(),
            Collectors.mapping(number->(char)(96+number), Collectors.toList())));

    System.out.println(collect);
    System.out.println();
  }
}
