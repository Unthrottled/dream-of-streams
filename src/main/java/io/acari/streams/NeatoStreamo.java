package io.acari.streams;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class NeatoStreamo {

  public static void main(String... args){
    Stream<String> theCoolCrew = Stream.of("Alex;Steve;Amy;Chad;Bill".split(";"));
    theCoolCrew.forEach(System.out::println);

    try {
      theCoolCrew.forEach(stringToPrint -> System.out.println(stringToPrint));
    } catch (IllegalStateException ignored) {
      System.out.println("Only one terminal operatian can be applied to a" +
          " stream, streams are not re-usable.");
      System.out.println();


      List<String> coolCrew = Stream.of("Alex;Steve;Amy;Chad;Bill".split(";"))
          .collect(Collectors.toList());

      System.out.println(coolCrew);


    }
  }
}
