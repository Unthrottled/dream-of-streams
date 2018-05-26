package io.acari.streams;

import com.google.common.collect.Lists;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DreamsOfStreams {

  public static void main(String... args){

    List<PodMember> podMembersEnhanced = Stream.of((
        "Alex Java,Functional_Programming,Javascript,Fixing_bugs,Fun_Commit_Messages;" +
            "Steve Cobol,Ada,Java,Groovy,Pineapples,Sunday_Mornings;" +
            "Amy Javascript,HTML,CSS,Spiders,Assembly;" +
            "Chad PHP,Java,Ruby,Purple_Stuff,Anime;" +
            "Mira Python,Ruby,Whitespaces,Java,Lombok,Curly_Brace_Placement").split(";"))
        .map(podMemberInfo -> {
          String[] split = podMemberInfo.split(" ");
          return PodMember.builder()
              .name(split[0])
              .interests(new DreamsOfStreams.Interests(Lists.newArrayList(split[1].split(","))))
              .build();
        })
        .collect(Collectors.toList());

    Pod pod = podMembersEnhanced.stream()
        .collect(Pod::new, Pod::addPodMumber, Pod::assimatePod);


  }

  @Data
  @Builder
  @NoArgsConstructor
  static class Pod {
    private Set<PodMember> podMembers;

    public Pod addPodMumber(PodMember podMember){
      podMembers.add(podMember);
      return this;
    }

    public Pod assimatePod(Pod otherPod){//resistance is futile assimilation is eminent
      podMembers.addAll(otherPod.podMembers);
      return this;
    }
  }


  @Data
  @Builder
  static class PodMember {
    private String name;
    private Interests interests;
  }

  @Data
  @AllArgsConstructor
  static class Interests {
    private List<String> coreIntrests;

    public boolean areSane() {
      return coreIntrests.stream().noneMatch(interest->interest.contains("bugs") || interest.contains("spiders"));
    }

    public boolean hasInterest(String interest) {
      final String _interest = interest.toUpperCase();
      return coreIntrests.stream().map(String::toUpperCase)
          .anyMatch(i->i.contains(_interest));
    }
  }
}
