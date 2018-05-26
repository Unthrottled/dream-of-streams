package io.acari.streams;


import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class NeatoStreamo {

  public static void main(String... args) {
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

      //create podmember with name

      System.out.println(coolCrew);

      List<PodMember> simplePod = coolCrew.stream()
          .map(podMemberInfo -> PodMember.builder()
              .name(podMemberInfo))
          .map(PodMember.PodMemberBuilder::build)
          .collect(Collectors.toList());

      System.out.println(simplePod);

      // create interest and add as field

      List<PodMember> podMembersEnhanced = Stream.of((
          "Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
              "Steve Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
              "Amy Javascript,HTML,CSS,Spiders,Lombok;" +
              "Chad PHP,Java,Ruby,Green_Stuff,Anime;" +
              "Mira Python,Ruby,Whitespaces,Curly_Brace_Placement").split(";"))
          .map(podMemberInfo -> {
            String[] split = podMemberInfo.split(" ");
            return PodMember.builder()
                .name(split[0])
                .interests(new Interests(Lists.newArrayList(split[1].split(","))))
                .build();
          })
          .collect(Collectors.toList());

      System.out.println(podMembersEnhanced);

      List<PodMember> sanePodMembers = podMembersEnhanced.stream()
          .filter(podMember -> podMember.getInterests().areSane())
          .collect(Collectors.toList());

      System.out.println(sanePodMembers);

    }
  }

}

@Data
@Builder
class PodMember {
  private String name;
  private Interests interests;
}

@Data
@AllArgsConstructor
class Interests {
  private List<String> coreIntrests;

  public boolean areSane() {
    return coreIntrests.stream().noneMatch(interest->interest.contains("bugs") || interest.contains("spiders"));
  }
}
