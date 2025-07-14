import { Component, OnInit } from '@angular/core';

interface Event {
  id: number;
  title: string;
  desc: string;
  image: string;
  date: string;
  time: string;
  location: string;
  category: string;    // treated as department
  department: string;
}

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  // Auto-detected department (replace with real logic if using auth)
  userDepartment: string = 'comp-sci';

  // Default to user's own department
  selectedCategory: string = this.userDepartment;
  searchQuery: string = '';

  categories = [
    { name: 'Computer Science', value: 'comp-sci' },
    { name: 'Arts', value: 'arts' },
    { name: 'Commerce', value: 'commerce' }
  ];

  allEvents: Event[] = [
    {
      id: 1,
      title: 'AI Summit 2025',
      desc: 'Explore latest trends in artificial intelligence.',
      image: 'assets/events/tech1.jpg',
      date: '2025-08-10',
      time: '10:00 AM',
      location: 'Auditorium A',
      category: 'comp-sci',
      department: 'comp-sci',
    },
    {
      id: 2,
      title: 'Robotics Lab Workshop',
      desc: 'Build and program your own bots.',
      image: 'assets/events/tech2.jpg',
      date: '2025-08-15',
      time: '9:00 AM',
      location: 'Lab 3',
      category: 'comp-sci',
      department: 'comp-sci',
    },
    {
      id: 3,
      title: 'Fine Arts Fest',
      desc: 'Showcase of creativity and culture.',
      image: 'assets/events/arts1.jpg',
      date: '2025-09-01',
      time: '1:00 PM',
      location: 'Open Theatre',
      category: 'arts',
      department: 'arts',
    },
    {
      id: 4,
      title: 'Commerce Conclave',
      desc: 'Business case studies and competitions.',
      image: 'assets/events/commerce1.jpg',
      date: '2025-09-05',
      time: '11:00 AM',
      location: 'Seminar Hall',
      category: 'commerce',
      department: 'commerce',
    },
    {
      id: 5,
      title: 'CodeStorm Hackathon',
      desc: '48-hour coding marathon.',
      image: 'assets/events/tech3.jpg',
      date: '2025-09-10',
      time: '8:00 AM',
      location: 'Block B - Basement',
      category: 'comp-sci',
      department: 'comp-sci',
    },
    {
      id: 6,
      title: 'Art Battle 2025',
      desc: 'Live speed painting and creative battles.',
      image: 'assets/events/arts2.jpg',
      date: '2025-10-10',
      time: '3:00 PM',
      location: 'Art Room',
      category: 'arts',
      department: 'arts',
    },
    {
      id: 7,
      title: 'Stock Market Simulation',
      desc: 'Mock trading and financial planning games.',
      image: 'assets/events/commerce2.jpg',
      date: '2025-10-15',
      time: '1:00 PM',
      location: 'Commerce Block',
      category: 'commerce',
      department: 'commerce',
    }
  ];

  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;

  ngOnInit(): void {
    this.filterEvents();
  }

  filterEvents(): void {
    this.filteredEvents = this.allEvents.filter(event => {
      const matchesCategory = this.selectedCategory === 'all' || event.category === this.selectedCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.desc.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(start, end);
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  isAllowedToRegister(department: string): boolean {
    return department === this.userDepartment;
  }

  canRegister(department: string): boolean {
    return this.isAllowedToRegister(department);
  }
}
