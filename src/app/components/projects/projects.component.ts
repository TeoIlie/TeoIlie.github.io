import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Deep RL for Active SLAM',
      description:
        'Built an Active SLAM system for autonomous navigation using ROS2, Gazebo, SLAM Toolbox, and PIC4RL on a Clearpath Jackal robot.',
      image: 'assets/demo.gif',
      technologies: ['ROS2/Gazebo', 'SLAM Toolbox', 'PIC4rl'],
      link: 'https://github.com/yourusername/project-one',
    },
    {
      title: 'Project Two',
      description:
        'Another project description highlighting the key features and your contributions. Talk about the challenges and how you overcame them.',
      image: 'assets/project2.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/yourusername/project-two',
    },
    {
      title: 'Project Three',
      description:
        'A third project showcasing different skills and technologies. Explain the impact and results of this project.',
      image: 'assets/project3.jpg',
      technologies: ['Vue.js', 'Express', 'PostgreSQL'],
      link: 'https://github.com/yourusername/project-three',
    },
  ];
}
