import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Other {
  otherUrl: string;
  otherName: string;
}

interface Project {
  title: string;
  description: string;
  webmUrl: string;
  mp4Url: string;
  isGif: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  other?: Other;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Deep RL for Active SLAM',
      description:
        'Built an Active SLAM system for autonomous navigation using ROS2, Gazebo, SLAM Toolbox, and PIC4RL on a Clearpath Jackal robot.',
      mp4Url: 'assets/videos/slam.mp4',
      webmUrl: 'assets/videos/webm/slam.webm',
      technologies: [
        'ROS2',
        'Gazebo',
        'SLAM',
        'Deep RL',
        'Occupancy grid',
        'Pose graph optimization',
      ],
      githubUrl: 'https://github.com/TeoIlie/Active_SLAM_with_DRL',
      liveUrl: 'https://youtu.be/a0PUhAlBM3Q',
      isGif: true,
    },
    {
      title: 'CNN Handwriting Classifier',
      description:
        'Designed and implemented a Convolutional Neural Network model in Python from scratch to classify handwritten digits, using the MNIST dataset.',
      mp4Url: 'assets/videos/cnn.mp4',
      webmUrl: 'assets/videos/webm/cnn.webm',
      technologies: ['Python', 'Convolutional Neural Network'],
      githubUrl: 'https://github.com/TeoIlie/Intro_to_Neural_Networks',
      isGif: true,
    },
    {
      title: 'AI Pacman Game',
      description:
        'Implemented probabilistic inference algorithms to enable Pacman to hunt invisible ghosts based on noisy distance readings.',
      mp4Url: 'assets/videos/pacman.mp4',
      webmUrl: 'assets/videos/webm/pacman.webm',
      technologies: ['Inference', 'Python', 'AI'],
      githubUrl: 'https://github.com/TeoIlie/AI_Pacman_Agent_Game/tree/main',
      isGif: true,
    },
    {
      title: 'Monocular Visual Odometry in OpenCV',
      description:
        'Implemented SIFT feature detection and brute-force matching to accomplish Monocular Visual Odometry (MVO)',
      mp4Url: 'assets/videos/mvo.mp4',
      webmUrl: 'assets/videos/webm/mvo.webm',
      technologies: ['OpenCV', 'MVO', 'Carla', 'AdverCity'],
      githubUrl: 'https://github.com/TeoIlie/Computer_Vision_MVO_Toy_Problem',
      isGif: true,
    },
    {
      title: 'Theory alignment via regular bisimulation',
      description:
        'Designed a program using tarski, a PDDL Python library, to automatically detect isomorphism, which was used to automate checking correctness of candidate solutions.',
      mp4Url: 'assets/videos/pddl.mp4',
      webmUrl: 'assets/videos/webm/pddl.webm',
      technologies: ['PDDL', 'Python', 'tarski'],
      paperUrl: 'https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_7781.pdf',
      liveUrl: 'http://mulab.ai/demo/p4pp',
      isGif: true,
      other: {
        otherUrl: 'https://mulab.ai/project/499-22-automated-assessments/',
        otherName: 'Report',
      },
    },
    {
      title: 'OpenGL Scene Generation',
      description:
        'Designed a 3D scene with ray tracing, reflection, refraction, and surface rendering in OpenGL using C++',
      mp4Url: 'assets/videos/boats.mp4',
      webmUrl: 'assets/videos/webm/boats.webm',
      technologies: ['Computer Graphics', 'Ray Tracing', 'OpenGL'],
      githubUrl: 'https://github.com/TeoIlie/COMP390-Computer-Graphics',
      isGif: true,
    },
  ];
}
